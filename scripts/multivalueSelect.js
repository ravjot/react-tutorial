/** @jsx React.DOM */

var MultiValueSelectChoices = React.createClass({
	handleSelect: function(indexOfItem){
		console.log("MultivalueSelectChoices> Removing node: " + indexOfItem);
		this.props.onUnselect(indexOfItem);
	},
	render: function(){
		var self = this;
		return (
			<ul className="multivalue-select-choices">
				{this.props.items.map(function(item, i){
							return <MultiValueSelectChoice name={item.name} key={item.id} onSelect={self.handleSelect}/>
					})}
			</ul>
		)
	}
});

var MultiValueSelectChoice = React.createClass({
	handleSelect: function(){
		console.log("MultivalueSelectChoice> I am " + this.props.name);
		this.props.onSelect(this.props.key);
	},
	render: function(){
		return (
			<li className="multivalue-select-choice">
				<div>{this.props.name}</div>
				<a href="#" className="multivalue-select-choice-close" onClick={this.handleSelect}>x</a>
			</li>
		);
	}
});

var AutocompleteSelectResults = React.createClass({
	handleSelect: function(indexOfItem){
		this.props.onSelect(indexOfItem)
	},
	render: function(){
		var filterText = this.props.filterText;
		var self = this;
		return (
			<ul className="menu-select-choices">
					{this.props.items.map(function(item, i){
							var name = item.name;
							var indexOfFilterText = name.toLowerCase().indexOf(filterText.toLowerCase());
							var contains = (filterText === "") ? true : (indexOfFilterText >= 0);
								if(contains){
									return <AutocompleteSelectResult name={item.name} filterText={filterText} key={item.id} onSelect={self.handleSelect}/>
								}
					})}
			</ul>
		);
	}
});

var AutocompleteSelectResult = React.createClass({
	handleSelect: function() {
		this.props.onSelect(this.props.key);
	},
	render: function() {
		var name = this.props.name;
		var indexOfFilterText = name.toLowerCase().indexOf(this.props.filterText.toLowerCase());
		var contains = (indexOfFilterText >= 0);
		var filterText = (contains) ? name.substring(indexOfFilterText, indexOfFilterText+this.props.filterText.length) : "";
		var textBefore = (contains) ? name.substring(0, indexOfFilterText) : name;
		var textAfter = (contains) ? name.substring(indexOfFilterText+filterText.length) : "";
		var underlineStyle = {textDecoration: "underline"}

		return (
			<li className="menu-select-choice" onClick={this.handleSelect}>
				<div>{textBefore}<span style={underlineStyle}>{filterText}</span>{textAfter}</div>
			</li>
		);
	}
});

var AutocompleteSelectBox = React.createClass({
	getInitialState: function() {
			return {
					filterText: ''
			};
	},
	handleUserInput: function() {
		var val = this.refs.filterTextInput.getDOMNode().value
			this.setState({
					filterText: val
			});
	},
	handleSelect: function(indexOfItem) {
		this.props.onSelect(indexOfItem)
	},
	render: function(){
		return (
			<div>
				<input
					type="text"
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					onChange={this.handleUserInput}
					ref="filterTextInput"
				/>
				<AutocompleteSelectResults
					items={this.props.items}
					filterText={this.state.filterText}
					onSelect={this.handleSelect}
				/>
			</div>
		)
	}
});

var MultiValueSelect = React.createClass({
	getInitialState: function(){
		return {
			items: this.props.items
		};
	},
	handleSelect: function(indexOfItem){
		this.props.items[indexOfItem].selected = !this.props.items[indexOfItem].selected;
		var self = this;
		this.setState({
				items: self.props.items
			});
	},
	render: function(){
		var self = this;
		var selected = [];
		var unselected = [];
		this.state.items.map(function(item, i){
			item.id = i;
			(item.selected) ? selected.push(item) : unselected.push(item)
		});

		return (
			<div className="multiSelect">
				<MultiValueSelectChoices items={selected} onUnselect={this.handleSelect}/>
				<AutocompleteSelectBox items={unselected} onSelect={this.handleSelect}/>
			</div>
		);
	}

});

var jackson5 = [
								{ name: "Jackie Jackson", selected: true },
								{ name: "Tito Jackson", selected: false },
								{ name: "Jermaine Jackson", selected: true },
								{ name: "Marlon Jackson", selected: true },
								{ name: "Michael Jackson", selected: true },
								{ name: "Randy Jackson", selected: true }
]

var CheckLink = React.createClass({
	render: function() {
		// transferPropsTo() will take any props passed to CheckLink
		// and copy them to <a>
		return this.transferPropsTo(<a>{'√ '}{this.props.children}</a>);
	}
});

// React.renderComponent(
//   <CheckLink href="javascript:alert('Hello, world!');" >
//     Click here!
//   </CheckLink>,
//   document.getElementById('container')
// );

var rendered = React.renderComponent(
	<MultiValueSelect items={jackson5} />,
	document.getElementById('container')
);

console.log(rendered);
