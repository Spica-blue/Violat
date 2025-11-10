import logging

logger = logging.getLogger('request_logger')

class RequestLoggingMiddleware:
    """Log basic request info to help debug intermittent 404s."""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log method, path, host, remote addr, and headers of interest
        try:
            remote = request.META.get('REMOTE_ADDR')
            host = request.get_host()
            method = request.method
            path = request.get_full_path()
            origin = request.META.get('HTTP_ORIGIN')
            referer = request.META.get('HTTP_REFERER')
            content_type = request.META.get('CONTENT_TYPE')
            logger.warning(f"Request: {method} {path} host={host} remote={remote} origin={origin} referer={referer} content_type={content_type}")
        except Exception:
            logger.exception('Error logging request')

        response = self.get_response(request)

        try:
            status = getattr(response, 'status_code', None)
            if status == 404:
                # attempt to resolve the path to see what Django thinks
                from django.urls import resolve, Resolver404
                try:
                    match = resolve(request.path)
                    logger.warning(f"Resolved 404 path to view: {match.view_name} func={match.func}")
                except Resolver404:
                    logger.warning(f"Could not resolve path: {request.path}")
                logger.warning(f"Response 404 for {request.path}; method={request.method} host={request.get_host()} remote={request.META.get('REMOTE_ADDR')}")
        except Exception:
            logger.exception('Error while logging response info')

        return response
