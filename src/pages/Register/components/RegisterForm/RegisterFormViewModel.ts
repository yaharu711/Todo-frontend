import { useState } from "react";
import { useRegist } from "../../../../api/User/hooks";
import { showSuccessToast } from "../../../../util/CustomToast";

const useRegisterFormViewModel = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const defaultInputError = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    }
    const [inputError, setInputError] = useState(defaultInputError);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setInputError(prev => ({...prev, name: ''}));
    };
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setInputError(prev => ({...prev, email: ''}));
    };
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setInputError(prev => ({...prev, password: ''}));
    };
    const onChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(e.target.value);
        setInputError(prev => ({...prev, passwordConfirmation: ''}));
    };

    const {mutate: registMutate, isPending: isPendingForRegist} = useRegist(setInputError);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name === '') {
            setInputError(prev => ({...prev, name: '名前は1文字以上入力してください'}));
        };
        if (email === '') {
            setInputError(prev => ({...prev, email: 'メールアドレスを入力してください'}));
        }
        if (password === '') {
            setInputError(prev => ({...prev, password: 'パスワードを入力してください'}));
        }
        if (passwordConfirmation === '') {
            setInputError(prev => ({...prev, passwordConfirmation: 'パスワード確認を入力してください'}));
        }
        // 一つでもエラーが発生していたらそこで処理終了
        // JSだと、オブジェクトは参照なので＝==で比較しても値が同じでも異なるものと判定されるので以下のように判定している
        const hasError = Object.values(inputError).some(error => error !== "");
        if (hasError) return;

        registMutate({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        }, {
            onSuccess: () => showSuccessToast('登録に成功しました✅'),
        });
    }

    return {
        name,
        onChangeName,
        email,
        onChangeEmail,
        password,
        onChangePassword,
        passwordConfirmation,
        onChangePasswordConfirmation,
        inputError,
        onSubmit,
        isPendingForRegist,
    }
}

export default useRegisterFormViewModel;
