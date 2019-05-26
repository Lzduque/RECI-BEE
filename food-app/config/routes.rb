Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # '/' -> index.html?

  scope '/api' do
    get :users, to: 'users#index'
    get :ingredients, to: 'ingredients#index'
  end
end
