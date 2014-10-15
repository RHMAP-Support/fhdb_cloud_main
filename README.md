# fhdb Cloud Main

This is a cloud app that interfaces with a specific MongoDB

# Group Cloud App API

# fhdbList [/fhdbList]

'fhdbList' endpoint.

## fhdbList [GET] 

'fhdbList' endpoint.

+ Request (application/json)
    + Body
            {}

+ Response 200 (application/json)
    + Body

# add [/fhdbAdd]

'fhdbAdd' endpoint.

## fhdbAdd [POST] 

'fhdbAdd' endpoint.

+ Request (application/json)
    + Body
            { "firstname" : "jim", "lastname" : "jones", "country" : "Ireland", "phone" : "123456" } 

+ Response 200 (application/json)
    + Body

# fhdbListLastName [/fhdbListLastName]

'fhdbListLastName' endpoint.

## fhdbListLastName [POST] 

'fhdbListLastName' endpoint.

+ Request (application/json)
    + Body
            { "lastname": "smith" }

+ Response 200 (application/json)
    + Body


# deleteall [/deleteall]

'deleteall' endpoint.

## deleteall [GET] 

'deleteall' endpoint.

+ Request (application/json)
    + Body
            {}

+ Response 200 (application/json)
    + Body
