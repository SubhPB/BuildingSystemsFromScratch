# Byimaan

class HttpPathDoesNotExist(Exception):
    def __init__(self, message="Requested path does not exist") -> None:
        self.message = message
        super().__init__(self.message)