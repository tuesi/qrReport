import { View } from "react-native"
import QRCode from "react-native-qrcode-svg";
import { LOGO_NAME } from "../../constants";

const HiddenQr = ({ qrData, svgRef }) => {
    return (
        <View style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
            <QRCode value={qrData} size={500} logo={LOGO_NAME} logoSize={125} getRef={svgRef} />
        </View>
    )
}

export default HiddenQr;