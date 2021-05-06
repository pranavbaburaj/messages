from flask import Flask

class ApplicationRoutes(object):
    def __init__(self, app, routes):
        assert isinstance(app, Flask) and isinstance(routes, dict)
        self.app = app
        self.routes = routes
        self.counter = 0

        self.create_application_routes()

    def create_application_routes(self):
        for url_rule in self.routes:
            self.app.add_url_rule(url_rule, view_func=self.routes.get(url_rule).as_view(str(self.counter)))
            self.counter += 1
    
    def __repr__(self):
        return str(self.routes)

        