import socket

from app import app, database
from routes import ApplicationRoutes

from views import IndexView
from register import RegisterUserView


routes = ApplicationRoutes(app, {
    "/" : IndexView,
    "/register" : RegisterUserView
})


class ValidLocalPort(object):
    def __init__(self, current_port=5000):
        self.current_port = current_port

    def return_closed_port(self):
        port = self.current_port
        last_character = str(port)[-1]

        while self.__is_port_open(port):
            last_character += 1
            port = f'{port[:-1]}{last_character}'
        
        return port

    def __is_port_open(self, port):
        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            server.connect((ip, int(port)))
            server.shutdown(2)
            return True
        except:
            return False

if __name__ == "__main__":
    port = ValidLocalPort().return_closed_port()
    print(port)

    database.create_all()
    app.run(debug=True)