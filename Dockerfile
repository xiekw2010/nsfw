# 直接 base on caffe 的 docker 安装
FROM caffe:cpu

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Reset logs & ide settings
RUN rm -rf /usr/src/app/logs
RUN rm -rf /usr/src/app/.idea
RUN rm -rf /usr/src/app/.vscode

# python 报错, 需要启动的时候执行这个脚本
RUN ln -s /dev/null /dev/raw1394

RUN pip install Flask request jsonify

EXPOSE 5001

CMD sh -c 'ln -s /dev/null /dev/raw1394'; python app.py
