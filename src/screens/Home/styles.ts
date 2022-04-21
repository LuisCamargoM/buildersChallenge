import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex:1;
    backgroundColor: #FFF;
`;

export const ContainerTop = styled.View`
    justifyContent: space-between;
    alignItems: center;  
    height: 100%;
`;

export const ContainerBottom = styled.View`        
    position: absolute;
    bottom: 0;
`;

export const UpdateMessageView = styled.View`
    alignItems: center;
`;

export const Logo = styled.Image`     
    aspectRatio: 2.5;
    resizeMode: contain;  
`;

export const Locations = styled.Image`
    height: 360px;
    resizeMode: contain;
    bottom: -2px;
`;

export const Button = styled.TouchableOpacity`
    backgroundColor: #FFC100;
    minWidth: 100%;
    height: 70px;
    flexDirection: column;
    justifyContent: center;
`;

export const ButtonText = styled.Text`
    textAlign: center;
    fontWeight: bold;
    color: #2F2E41;
    fontSize: 16px;
`;

export const MessageText = styled.Text`
    fontSize: 8px;
    fontWeight: bold;
`;