import { View } from "react-native"
import QRCode from "react-native-qrcode-svg";

const HiddenQr = ({ qrData, svgRef }) => {

    let logoFromFile = require('../../assets/aug.png');

    return (
        <View style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
            <QRCode value={qrData} size={500} logo={logoFromFile} getRef={svgRef} />
        </View>
    )
}

export default HiddenQr;