FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_API_URL
ARG VITE_PUBLIC_API_KEY
ARG VITE_COMPANY_EXTERNAL_ID

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_PUBLIC_API_KEY=$VITE_PUBLIC_API_KEY
ENV VITE_COMPANY_EXTERNAL_ID=$VITE_COMPANY_EXTERNAL_ID

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS prod

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
