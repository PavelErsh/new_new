# Используем Python образ
FROM python:3.12-slim

# Устанавливаем рабочую директорию
WORKDIR /web_app

# Устанавливаем зависимости для сборки некоторых библиотек
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*


RUN pip install asyncpg sqlalchemy[asyncio]
# Обновляем pip
RUN pip install --upgrade pip

# Копируем файл с зависимостями и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


# Копируем все файлы проекта
COPY . .

# Указываем команду по умолчанию для запуска приложения через uvicorn
CMD ["sh", "-c", "uvicorn web_app.main:app --host 0.0.0.0 --port 8000 --reload"]
