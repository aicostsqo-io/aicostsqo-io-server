FROM node:18
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN mkdir -p v1/src/uploads/gpr-profiles
RUN mkdir -p v1/src/uploads/gprs
RUN mkdir -p v1/src/uploads/seismic-profiles
RUN mkdir -p v1/src/uploads/resistivitiy-contours
RUN mkdir -p v1/src/uploads/resistivities
RUN mkdir -p v1/src/uploads/magnetometrics

USER $CONTAINER_USER_ID
CMD [ "node", "v1/src/app.js" ]