const getBook = () => {
    let bname = document.querySelector('#bookName').value;
    let bwriter = document.querySelector('#bookWriter').value;
    let bcompany = document.querySelector('#bookCompany').value;

    return {
        bname: bname,
        bwriter: bwriter,
        bcompany: bcompany
    };
}

const onWrite = async () => {
    try {
        const dto = getBook();

        const option = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dto)
        };        
        console.log(`onWrite: ${dto.bname} ${dto.bwriter} ${dto.bcompany}`);

        const response = await fetch('/BookAdmin/book', option);
        const result = await response.json();
        if (result == true) {
            alert('도서 등록 성공');
        } else {
            alert('!! 도서 등록 실패');
        }
        location.href = 'index.html';
    } catch (error) {
        console.error('error:', error);
    }
}