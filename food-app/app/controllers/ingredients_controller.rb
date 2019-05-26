class IngredientsController < ApplicationController

  def index

    render(
      status: 200,
      #User is name of model not table
      #When searching with curl: localhost:3001/api/users?name=test
      json: Ingredient.all
    )
  end
end