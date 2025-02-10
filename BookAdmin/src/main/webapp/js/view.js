const onView = async () => {
    const bno = new URL(location.href).searchParams.get('bno');
    console.log(`onView: ${bno}`);
	let html = ``;
    let viewbox = document.querySelector(".viewbox");
	try {
        const bno = new URL(location.href).searchParams.get('bno');

        const option = { method: 'GET' };
        const response = await fetch(`/BookAdmin/book/view?bno=${bno}`, option);
        const dto = await response.json();

		html += `<h3>도서 상세 정보</h3>
		        <ul>
		            <li>도서번호: ${dto.bno}</li>
		            <li>도서명: ${dto.bname}</li>
		            <li>저자: ${dto.bwriter}</li>
		            <li>출판사: ${dto.bcompany}</li>
		            <li>생성일: ${dto.indate}</li>
		            <li>수정일: ${dto.putdate}</li>
		        </ul>
		        <button class='btn btn-primary' onclick="location.href='index.html'">뒤로가기</button>
		        <button class='btn btn-primary' onclick="location.href='update.html?bno=${dto.bno}'">수정하기</button>
		        `
		
				viewbox.innerHTML = html;
				
        // <li>도서번호: <span id="bookNo"></span></li>
        //     <li>도서명: <span id="bookName"></span></li>
        //     <li>저자: <span id="bookWriter"></span></li>
        //     <li>출판사: <span id="bookCompany"></span></li>
        //     <li>생성일: <span id="bookInDate"></span></li>
        //     <li>수정일: <span id="bookPutDate"></span></li>

        // dto{bno / bname / bwriter / bcompany / indate / putdate}
        // {
        //     "bno": 6,
        //     "bname": "sample",
        //     "bwriter": "sample",
        //     "bcompany": "sample",
        //     "indate": "2025-02-10 11:29:45",
        //     "putdate": null
        // }

        //document.querySelector('#bookNo').innerHTML = bno;
        //document.querySelector('#bookName').innerHTML = dto.bname;
        //document.querySelector('#bookWriter').innerHTML = dto.bwriter;
        //document.querySelector('#bookCompany').innerHTML = dto.bcompany;
        //document.querySelector('#bookInDate').innerHTML = dto.indate;
        //document.querySelector('#bookPutDate').innerHTML = dto.putdate;
    } catch (error) {
        console.error('error:', error.message);
    }
}
onView();

const onDelete = async () => {
    const bno = new URL(location.href).searchParams.get('bno');
    console.log(`view.js onDelete: ${bno}`);

    try {
        const bno = new URL(location.href).searchParams.get('bno');

        const option = { method: 'DELETE' };
        const response = await fetch(`/BookAdmin/book?bno=${bno}`, option);
        const dto = await response.json();

        if (result == true) {
            alert('도서 삭제 성공');
        } else {
            alert('!! 도서 삭제 실패');
        }
        location.href = 'index.html';
        
    } catch (error) {
        console.error('error:', error.message);
    }
}