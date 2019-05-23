Rails.application.routes.draw do

  # We’re done with the API, but where will we render React? Let’s build a static view where the application will lead us. First, we’ll have to create a controller that’s solely responsible for rendering the static view.
  root to: 'site#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # The routing for the controller has to consider the fact that it’s within two namespaces; API and V1. We’ll do this using the namespace method.

  namespace :api do
    namespace :v1 do
      resources :items, only: [:index, :create, :destroy, :update]
    end
  end

end
