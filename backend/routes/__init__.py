from .auth import auth
from .forgot_password import fp
from .salt import salt


def initialize_routes(app):
    app.register_blueprint(auth)
    app.register_blueprint(fp)
    app.register_blueprint(salt)
