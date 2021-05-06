from env import SimpleEnvLoader
import os


d = SimpleEnvLoader(os.path.dirname(__file__)).create_environment_variables()
print(d)