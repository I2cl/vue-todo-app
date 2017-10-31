class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
      t.string :name
      t.string :status
      t.string :assignee
      t.integer :mandays

      t.timestamps
    end
  end
end
