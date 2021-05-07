import smtplib
import ssl

class EmailException(object):
    def __init__(self, message):
        self.message = message.strip()

        super().__init__(self.message)

class EmailCredentials(object):
    def __init__(self, email, password):
        self.email = email
        self.password = password

class Emails(object):
    smtp_server = "smtp.gmail.com"
    port = 587
    context = ssl.create_default_context()
    
    def __init__(self, sender_credentials):
        assert isinstance(sender_credentials, EmailCredentials)
        self.email = email
        self.password = password

    def send(self, receivers, message):
        try:
            server = smtplib.SMTP(self.smtp_server,self.port)
            server.ehlo() 
            server.starttls(context=self.context) 
            server.ehlo() 
            server.login(self.email, self.password)
            for send_user in receivers:
                server.sendmail(self.email, send_user, message)
        except Exception as exception_message:
            raise EmailException(exception_message)
        finally:
            server.quit()

