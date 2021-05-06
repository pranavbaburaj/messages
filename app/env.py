import os

class SimpleEnvLoader(object):
    def __init__(self, directory, filename=".env"):
        self.path = os.path.join(directory, filename)

    def create_environment_variables(self):
        if not os.path.exists(self.path):
            return {}

        with open(self.path, "r") as env_reader:
            data = env_reader.read()
            return self.split_tokens(data.split("\n"))

    def split_tokens(self, data):
        variables = {}
        for element in data:
            key, value = element.split("=")
            variables.setdefault(key, value)
        return variables
