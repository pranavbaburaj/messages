from flask import Flask

class ApplicationRoutes(object):
    def __init__(self, app, routes):
        assert isinstance(app, Flask) and isinstance(routes, dict)
        self.app = app
        self.routes = routes
