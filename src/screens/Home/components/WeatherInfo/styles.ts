import styled from 'styled-components/native';

export const Container = styled.SafeAreaView<{ isNight: boolean }>`
    flex:1;
    backgroundColor: ${(props) => (props.isNight ? '#1F1F1F' : '#E6AE00')};
    flexDirection: column;
    justifyContent: space-between;
    marginVertical: 50px;
    width: 90%;
    borderRadius: 20px;
    borderColor: orange;
    borderWidth: 1px;
    paddingHorizontal: 25px;
`;

export const ContainerInfoColumn = styled.View`
    marginBottom: 20px;
    alignItems: center;
`;

export const WeatherImage = styled.Image`
    width: 80px;
    height: 80px;
`;

export const ContainerInfoInline = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    marginVertical: 50px;
`;

export const InfoInline = styled.View`
    alignItems: center;
`;

export const ContainerTop = styled.View`
    justifyContent: space-between;
    alignItems: center;  
    height: 100%;
`;

export const InfoColumn = styled.View`
    marginVertical: 5px;
    alignItems: center;
    marginHorizontal: 40px;
`;

export const Label = styled.Text`
    textAlign: center;
    fontWeight: bold;
    color: #fff;
    fontSize: 12px;
    marginVertical: 2px;
`;

export const DateText = styled.Text<{ isNight: boolean }>`
    fontSize: 50px; 
    fontWeight: bold;
    marginTop: 20px;
    color: ${(props) => (props.isNight ? '#FFC100' : '#1F1F1F')};
`;

export const AddressText = styled.Text`
    marginVertical: 5px;
    fontFamily: Verdana;
    textAlign: center;
    fontWeight: bold;
    color: #fff;
`;
export const Info = styled.Text<{ isNight: boolean }>`
    textAlign: center;
    fontWeight: bold;
    color: ${(props) => (props.isNight ? '#FFC100' : '#1F1F1F')};
    textTransform: uppercase;
    fontSize: 20px;
    marginVertical: 2px;
`;
