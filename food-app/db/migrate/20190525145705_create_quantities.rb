class CreateQuantities < ActiveRecord::Migration[5.0]
  def change
    create_table :quantities do |t|
      t.references :ingredient, foreign_key: true
      t.references :recipe, foreign_key: true
      t.decimal    :quantity

      t.timestamps
    end
  end
end
