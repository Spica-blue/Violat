FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY server/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY server/ .

# Default to using SQLite in container unless overridden
ENV USE_SQLITE=1

EXPOSE 8000

# Development mode: use Django runserver for better debugging
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Production mode (comment out above, uncomment below):
# CMD ["gunicorn", "server.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120"]
