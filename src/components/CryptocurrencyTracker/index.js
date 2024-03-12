// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import CryptocurrenciesList from '../CryptocurrenciesList'

const apiUrl = 'https://apis.ccbp.in/crypto-currency-converter'

class CryptocurrencyTracker extends Component {
  state = {isLoading: true, cryptoCurrenciesData: []}

  componentDidMount() {
    this.getCryptoCurrencies()
  }

  setCryptoCurrencies = (fetchedData, isLoadingStatus) => {
    this.setState({
      cryptoCurrenciesData: fetchedData.map(i => ({
        id: i.id,
        currencyLogoUrl: i.currency_logo,
        currencyName: i.currency_name,
        usdValue: i.usd_value,
        euroValue: i.euro_value,
      })),
      isLoading: isLoadingStatus,
    })
  }

  getCryptoCurrencies = async () => {
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()
    this.setCryptoCurrencies(fetchedData, false)
  }

  renderCryptoCurrencyList = () => {
    const {cryptoCurrenciesData} = this.state
    return <CryptocurrenciesList cryptoCurrenciesData={cryptoCurrenciesData} />
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Rings" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        {isLoading ? this.renderLoader() : this.renderCryptoCurrencyList()}
      </div>
    )
  }
}

export default CryptocurrencyTracker
