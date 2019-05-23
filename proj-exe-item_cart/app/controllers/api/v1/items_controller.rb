# After we’re done with the base controller, we can create a controller for our Item model. We’ll make the controller inherit from the base controller and put the standard index, create update and destroy actions.
# The respond_with method is part of the responders gem and will return a JSON object with the results of each action in the controller.
# The routing for the controller has to consider the fact that it’s within two namespaces; API and V1. We’ll do this using the namespace method.

class Api::V1::ItemsController < Api::V1::BaseController
  def index
    respond_with Item.all
  end

  def create
    respond_with :api, :v1, Item.create(item_params)
  end

  def destroy
    respond_with Item.destroy(params[:id])
  end

  def update
    item = Item.find(params["id"])
    item.update_attributes(item_params)
    respond_with item, json: item
  end

  private

  def item_params
    params.require(:item).permit(:id, :name, :description)
  end
end
