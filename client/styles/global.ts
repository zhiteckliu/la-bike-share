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
  }
});

export default globalStyles;
