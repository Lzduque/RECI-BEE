// The html markup is similar to the one we used previously, but the attributes and the functions are accessed via this.props, since they were referenced as properties of the template. Now, test out the functionality to be sure everything works.

var Item = React.createClass({
  getInitialState() {
    return {editable: false}
  },

  // Open your JavaScript console and try entering values into an item. Once you click the submit button, you will see the values displayed on the screen. We have the values in <Item /> and we have to send them up to the <Body /> where the array with all the items is stored and where we’re going to call our server. This means that we’ll use props functions to pass the data up the chain. The journey will start with <Item />, pass to <AllItems /> and end up in <Body />. Let’s start with <Item /> to <AllItems />:
  handleEdit() {
    if(this.state.editable) {
        var name = this.refs.name.value;
        var id = this.props.item.id;
        var description = this.refs.description.value;
        var item = {id: id , name: name , description: description};
        this.props.handleUpdate(item);

    }
    this.setState({ editable: !this.state.editable })
  },

  // A ternary operator must be implanted; this will render different elements depending whether this.state.editable is set to true or false. Here’s how to do that:
  render() {
    var name = this.state.editable ? <input type='text' ref='name' defaultValue={this.props.item.name} /> : <h3>{this.props.item.name}</h3>;
    var description = this.state.editable ? <input type='text' ref='description' defaultValue={this.props.item.description} />: <p>{this.props.item.description}</p>;
    return (
      <div>
        {name}
        {description}
        <button onClick={this.props.handleDelete}>Delete</button>
        <button onClick={this.handleEdit}>
          {" "}
          {this.state.editable ? "Submit" : "Edit"}{" "}
        </button>
      </div>
    );
  }
});
