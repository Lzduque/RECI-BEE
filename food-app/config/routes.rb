Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # '/' -> index.html?

  # root to: 'recipes#index'

  scope '/api' do

    resources :users

    resources :recipes do
      resources :quantities, only: [:index]
      resources :ingredients, only: [:index]
    end
    get '/recipes/search' => 'recipes#search'

  end
end
