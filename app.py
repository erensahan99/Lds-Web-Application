from zeep import Client

client = Client(wsdl="http://localhost:3000/soapservice?wsdl")

print(client.service.Add(5,10))