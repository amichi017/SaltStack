# import os
# basedir = os.path.abspath(os.path.dirname(__file__))
#
# class Config(object):
#
#
#
# class ProductionConfig(Config):
#     DEBUG = False
#
#
# class StagingConfig(Config):
#     DEVELOPMENT = True
#     DEBUG = True
#
#
# class DevelopmentConfig(Config):
#     DEVELOPMENT = True
#     DEBUG = True
#
#
# class TestingConfig(Config):
#     TESTING = True

DEBUG = False
TESTING = False
CSRF_ENABLED = True
SECRET_KEY = "this-is-secret-key"
# JWT_ACCESS_TOKEN_EXPIRES = False

MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USERNAME = 'notifsalt@gmail.com'
MAIL_PASSWORD = 'Salt5t@ck'
MAIL_USE_SSL = True
MONGO_URI = 'mongodb://saltstack:Salt5t@ck@localhost:27017/salt'