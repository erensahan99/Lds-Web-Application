from zeep import Client
from getmac import get_mac_address
  
# printing the value of unique MAC 
# address using uuid and getnode() function  
mac = get_mac_address()

# client = Client(wsdl="http://lodos-web-application.herokuapp.com/soapservice?wsdl")
client = Client(wsdl="http://localhost:3000/soap/"+mac)

numA = input("Enter numA: ")
numB = input("Enter numB: ")

print(client.service.Add(numA,numB))
