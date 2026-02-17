# Use a lightweight Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /code

# Install dependencies
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the application code
COPY ./app /code/app

# Start the server using Gunicorn with Uvicorn workers
# -w 4: starts 4 worker processes
# -k uvicorn.workers.UvicornWorker: tells Gunicorn to use Uvicorn's protocol
CMD ["gunicorn", "-w", "1", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "-b", "0.0.0.0:8000"]