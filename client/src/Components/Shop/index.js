import React, { Component } from 'react'
import PageTop from '../../utils/page_top';
import { connect } from 'react-redux';
import { getProductsToShop, getBrands, getWoods } from '../../actions/product_actions';
import { frets, price } from '../../utils/Form/fixed_categories';
import CollapseCheckBox from '../../utils/collapseCheckbox';
import CollapseRadio from '../../utils/collapseRadio'
import LoadmoreCart from './LoadmorCart';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';


class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());
        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))


    }

    handlePrice = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }

        return array;
    }

    handleFilters = (filters, category) => {
        const newFilters = { ... this.state.filters }
        newFilters[category] = filters;

        if (category === "price") {
            let priceValues = this.handlePrice(filters);
            newFilters[category] = priceValues;
        }

        this.showFilteredResults(newFilters);

        this.setState({ filters: newFilters })

    }

    handleGRid=()=>{
        this.setState({ grid: !this.state.grid ? 'grid_bars' : ''})
    }

    showFilteredResults = (filters) => {
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(() => {
            this.setState({ skip: 0 })
        })
    }

    loadMoreCards = () => {
        let skip = this.state.skip + this.state.limit;

        this.props.dispatch(getProductsToShop(skip, this.state.limit, this.state.filters, this.props.products.toShop))
            .then(() => {
                this.setState({ skip })
            })
    }

    render() {

        const products = this.props.products;
        console.log(this.state.filters);

        return (
            <div>
                <PageTop title="Browse Product" />

                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckBox initState={true} title="Brands" list={this.props.products.brands} handleFilters={(filters) => this.handleFilters(filters, 'brand')} />
                            <CollapseCheckBox initState={false} title="Frets" list={frets} handleFilters={(filters) => this.handleFilters(filters, 'frets')} />
                            <CollapseCheckBox initState={true} title="Woods" list={this.props.products.woods} handleFilters={(filters) => this.handleFilters(filters, 'wood')} />
                            <CollapseRadio initState={true} title="Price" list={price} handleFilters={(filters) => this.handleFilters(filters, 'price')} />

                        </div>

                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_frids clear">
                                    <div className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGRid()}
                                    >
                                        <FontAwesomeIcon icon={faTh} />
                                    </div>

                                    <div className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGRid()}
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </div>
                                </div>
                            </div>

                            <div >
                                <LoadmoreCart grid={this.state.grid} limit={this.state.limit} loadMore={() => this.loadMoreCards()
                                } size={this.props.products.toShopSize} products={this.props.products.toShop} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Shop)