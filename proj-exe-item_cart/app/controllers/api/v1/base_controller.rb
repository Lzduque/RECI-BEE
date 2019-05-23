# Because this is an API-based application, we’ll structure the controllers using namespaces. By convention, we have to put the controllers for the different namespaces in folders corresponding to their namespace. For example, all controllers belonging to the api namespace must be put in a folder named ‘api’. In the ‘controllers’ folder (in our application), we’ll create a folder named api and, in it, another folder named v1:

class Api::V1::BaseController < ApplicationController
  respond_to :json
end

# The respond_to method ensures that all actions from the controllers, which inherit from the base controller, will respond with JSON. This is the standard approach for building JSON-based APIs.