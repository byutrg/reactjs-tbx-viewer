const styles = {
    error: {
        color: 'red',
        fontWeight: 'bold'
    },

    mainWindow: {
        minHeight: '50%',
        minWidth: '60%',
        height: '100%'
    },

    blur: {
        backgroundColor: 'rgba(171,171,171,.8)',
        position:'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1000
    },

    popup: {
      position: 'relative',
      width: 600,
      height: '70%',
      top: '15%',
      margin: '0 auto',
      backgroundColor: '#EAE2D6',
    },

    popup__content: {
      position: 'relative',
      top: 40,
      margin: 40,
      height: '90%',
      backgroundColor: 'white',
    },

    popup__schema: {

    },

    uploadHeader: {
        backgroundColor: 'white',
        position: 'relative',
        margin: '0 auto',
        top: '15%',
        width: '55%',
        height: '20%',
        verticalAlign: 'middle',
        borderRadius: 5,
        h1: {
            margin: 0,
            fontFamily: 'sans-serif',
            fontWeight: 'lighter',
            textAlign: 'center',
            color: 'rgba(171,171,171,.8)',
            display: 'inline-block',
            paddingTop: '3%',
            height: '100%',
            width: '25%',
            fontSize: 120
        },
        p: {
            display: 'inline-block',
            height: '30%',
            width: '70%',
            color: 'rgba(171,171,171,.8)',
            fontSize: 45,
            fontFamily: 'sans-serif',
            verticalAlign: 'top',
            borderBottom: '6px solid rgba(171,171,171,.8)',
            borderRadius: 5
        }
    },

    uploadButton: {
        backgroundColor: 'white',
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: 5,
        paddingTop: '6%',
        fontSize: 30,
        color: 'rgba(171,171,171,.8)',
        label: {
            display: 'block',
            position: 'relative',
            margin: '0 auto',
            top: '25%',
            width: '25%',
            height: '10%',
        }
    },

    indented: {
        double: {
            marginLeft: 32
        },
        marginLeft: 16
    },

    term: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        borderBottom: '2px solid gray',
        width: 250,

        _popup: {
          fontSize: 32,
          paddingLeft: 5,
        }
    },

    conceptCard: {
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 10,
        width: 'auto'
    },

    langCard: {
        backgroundColor: 'white',
        borderRadius: 3,
        marginTop: 25,
        padding: 10
    },

    metadataItem: {
        container: {
            margin: 0,
            padding: 0
        },
        key: {
            display: 'inline-block',
            verticalAlign: 'top',
            margin: 0,
            padding: 0,
            fontSize: 16,
            width: 160
        },
        value: {
            display: 'inline-block',
            margin: 0,
            padding: 0,
            width: '70%',
            wordWrap: 'break-word'
        },
    },

    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#B8C4BA',
        color: 'black'
    },

    headerData_buttonBlock: {
        float: 'right'
    },

    headerData_button: {
        backgroundColor: '#D8D8D8',
        border: 0,
        margin: 15,
        height: 30,
        width: 100
    },

    headerData_block: {
        display: 'inline-block',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 30,
        textAlign: 'center'
    },

    headerData_dcName: {
        fontSize: 20,
        margin: 0,
        padding: 0
    },

    headerData_dcValue: {
        fontSize: 16,
        margin: 0,
        padding: 0
    },

    conceptEntryBlock: {
        backgroundColor: '#EAE2D6',
        float: 'right',
        height: '100%',
        width: '73.5%',
        marginTop: 5,
        overflow: 'auto'
    },

    conceptEntryBlockContents: {
        margin: 15
    },

    termBlock: {
        backgroundColor: '#EAE2D6',
        float: 'left',
        height: '100%',
        width: '25%',
        marginTop: 5,
        paddingLeft: 10,
        position: 'relative'
    },

    termBlockTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottom: '2px solid gray',
        width: '80%'
    },

    termBlockSearch: {
        backgroundColor: 'white',
        height: 24,
        border: '1px solid gray',
        paddingLeft: 5,
        paddingBottom: 8,
        borderRadius: 3
    },

    termBlockListContainer: {
        backgroundColor: 'white',
        height: '75%',
        width: '90%',
        position: 'absolute',
        bottom: 15,
        padding: 5,
        border: '1px solid gray',
        borderRadius: 3
    },

    termBlockList: {
        backgroundColor: 'white',
        height: '92%',
        overflow: 'auto'
    },

    termBlockListLine: {
        width: '60%',
        borderBottom: '1px solid #D8D8D8'
    },

    collapseArrowDown: {
        display: 'inline-block',
        width: 0,
        height: 0,
        marginLeft: 10,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',

        borderTop: '5px solid #D8D8D8'
    },

    collapseArrowLeft: {
        display: 'inline-block',
        width: 0,
        height: 0,
        marginLeft: 10,
        borderRight: '5px solid #D8D8D8',

        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent'
    },

    termBlockLangButton: {
        backgroundColor: '#D8D8D8',
        marginTop: 5,
        border: 0,
        width: 100,
        height: 30
    },

    termBlockLangBlock: {
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 15
    },

    termBlockListItem: {
        padding:0,
        margin: 1
    }
}

export default styles
