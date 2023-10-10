import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { PickerContainer, ErrorText } from './styles';
import setTiskLeavel from "../../utils/setRiskLevel";

const RiskLevelPicker = ({ control, value, onChange, errors }) => {
    return (
        <>
            <PickerContainer>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={{ color: '#fff'}}
                        >
                            <Picker.Item label={setTiskLeavel(1)} value="1" />
                            <Picker.Item label={setTiskLeavel(2)} value="2" />
                            <Picker.Item label={setTiskLeavel(3)} value="3" />
                            <Picker.Item label={setTiskLeavel(4)} value="4" />
                            <Picker.Item label={setTiskLeavel(5)} value="5" />
                        </Picker>
                    )}
                    name="risk_level"
                />
            </PickerContainer>
            {errors.risk_level && <ErrorText>{errors.risk_level.message}</ErrorText>}
        </>
    );
};

export default RiskLevelPicker;