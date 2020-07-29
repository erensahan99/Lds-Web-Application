from zeep import Client

client = Client(wsdl="http://lodos-web-application.herokuapp.com/soapservice?wsdl")
# client = Client(wsdl="http://localhost:3000/soapservice?wsdl")

numA = input("Enter numA: ")
numB = input("Enter numB: ")

print(client.service.Add(numA,numB))