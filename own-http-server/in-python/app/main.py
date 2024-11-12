# Byimaan

from server.http import Server

HOST_NAME, PORT = "localhost", 4221

def main():
    HTTPserver = Server(HOST_NAME, PORT)
    HTTPserver.start()

if __name__ == "__main__":
    main()