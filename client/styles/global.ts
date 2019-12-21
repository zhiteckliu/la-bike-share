import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  // home
  intro: {
    flex: 4,
    textAlign: 'center',
    fontSize: 30,
  },
  introHighlight: {
    fontWeight: '600'
  },
  options: {
    flex: 6,
    justifyContent: 'flex-end',
    marginBottom: 50
  },
  item: {
    padding: 16,
    textAlign: 'center',
    marginTop: 16,
    borderColor: '#333',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10
  },

  // rentForm and returnForm
  section: {
    marginTop: 16
  },
  sectionBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  optionItem: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f01d71',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },

  // rentResults and returnResults
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    textAlign: 'center'
  },
  summaryBlock: {
    alignItems: 'center'
  },
  summaryText: {
    width: 230
  },
  summaryHighlight: {
    fontWeight: '600'
  },

  // stationItem
  overview: {
    flex: 1,
    flexDirection: 'row',
  },
  overviewSection: {
    justifyContent: 'center',
    flex: 1
  },
  name: {
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  address: {
    flexDirection: 'row',
    marginTop: 10
  },
  addressText: {
    fontStyle: 'italic'
  },
  addressIcon: {
    height: 20,
    width: 20
  },
  totalSection: {
    flex: 1,
  },
  totalAvail: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
  },
  totalAvailTitle: {
    width: 80,
    marginLeft: 8,
    fontWeight: '600'
  },
  totalAvailCount: {
    justifyContent: 'center',
  },
  totalAvailCountNum: {
    marginLeft: 8,
    lineHeight: 32,
    width: 32,
    textAlign: 'center',
    borderRadius: 32,
    color: 'white',
    backgroundColor: '#00A2FF',
    fontWeight: '600'
  },
  breakdown: {
    marginTop: 8,
  },
  breakdownTitle: {
    fontWeight: '800'
  },
  breakdownSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  breakdownCategory: {
    flexDirection: 'row'
  },
  breakdownCount: {
    marginLeft: 8
  }
});

export default globalStyles;
