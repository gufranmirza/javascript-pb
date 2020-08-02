var pb = require('./build/addressbook_pb');

var phone_book = new pb.AddressBook()

// Person 1
var person1 = new pb.Person()
person1.setId(1001)
person1.setName("John Doe")
person1.setEmail("jdoe@example.com")
var phone_number1 = new pb.Person.PhoneNumber();
phone_number1.setNumber("12345-67890")
phone_number1.setType(pb.Person.PhoneType.WORK)
person1.setPhonesList([phone_number1])

// Person 2
var person2 = new pb.Person()
person2.setId(1002)
person2.setName("Alex")
person2.setEmail("alex@example.com")
var phone_number2 = new pb.Person.PhoneNumber();
phone_number2.setNumber("100122-5889")
phone_number2.setType(pb.Person.PhoneType.WORK)
person2.setPhonesList([phone_number2])

// add persons to the phonebook
phone_book.setPeopleList([person1, person2])

// let's stringity our Address object so binary array
// that we can use it transfer the data across services
data = phone_book.serializeBinary()

// printing out our raw protobuf object
console.log("Raw data: ", data)

// let's go the other way and parse our raw protobuf binary array 
// we can modify and use
var address_book  = pb.AddressBook.deserializeBinary(data)
var person_list = address_book.getPeopleList()

for (var i=0; i < person_list.length ; i++) {
    var person = person_list[i]
    var phones = person.getPhonesList()
    console.log("===========================")
    console.log("Person ID:", person.getId())
    console.log("Name:", person.getName())
    console.log("E-mail:", person.getEmail())
    for (var k=0; k < phones.length; k++) {
        var phone = phones[k]
        console.log("Phone:", phone.getType() == 2 ? "WORK" : "", phone.getNumber())
    }
}
