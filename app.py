from zeep import Client

client = Client(wsdl="http://lodos-web-application.herokuapp.com/soapservice?wsdl")

print(client.service.Add(5,10))