const getBook = () => {
	const bno = new URL(location.href).searchParams.get('bno');

	 let bname = document.querySelector('#bookName').value;
    let bwriter = document.querySelector('#bookWriter').value;
    let bcompany = document.querySelector('#bookCompany').value;

    return {
		bno : bno,
        bname: bname,
        bwriter: bwriter,
        bcompany: bcompany
    };
}

const onUpdate = async () => {
	
    try {
        const dto = getBook();
        console.log(`onUpdate: ${dto.bno} ${dto.bname} ${dto.bwriter} ${dto.bcompany}`);
		console.log(dto);
        const option = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dto)
        };

        const response = await fetch('/BookAdmin/book', option);
        const result = await response.json();
        if (result == true) {
            alert('도서 수정 성공');
        } else {
            alert('!! 도서 수정 실패');
        }
        location.href = 'index.html';
    } catch (error) {
        console.error('error:', error);
    }
}