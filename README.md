![Header](https://capsule-render.vercel.app/api?type=rect&color=06402b&text=Contacts&desc=연락처%20정보를%20관리하는%20전화번호부%20앱%20미니%20프로젝트&section=header&height=250&fontColor=ffffff&fontSize=60&fontAlignY=45&descAlignY=67&descSize=30)
<br><br>

## 📍프로젝트 소개
현재 위치를 바탕으로 날씨를 알려주는 리액트 기반의 날씨 앱 미니 프로젝트입니다. OpenWeatherMap, Geolocation API를 통해 현재 위치 또는 미리 설정된 주요 도시의 다양한 날씨 정보를 실시간으로 받아와 렌더링합니다.

## 📍개발기간
2024.08.13 ~ 08.16 (3일)

## 📍기술스택
<div>
	<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
	<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
	<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
	<img src="https://img.shields.io/badge/API Call-E3695F?style=for-the-badge&logoColor=white"> 
</div>

## 📍주요기능

## 📍리덕스(Redux)
![Redux](https://github.com/user-attachments/assets/a1575b95-084f-4431-a12e-7c0a7bf7c147)


## 📍컴포넌트 구성

## 📍상세기능
### 1) 기본기능
#### 1-1) 연락처 추가
```
dispatch({type:"ADD_CONTACT", payload:{id, name, phoneNumber, memo, profileImg}});
```
- action: `ADD_CONTACT`
- payload: `id`, `name`, `phoneNumber`, `memo`, `profileImg`
- 아이디는 삭제 기능을 구현하기 위해 타임스탬프를 통해 고유값을 부여합니다.
- 이름과 전화번호는 반드시 입력되어야 하는 필수값이며, 메모는 선택사항입니다.
- 프로필사진은 디폴트 이미지가 설정되어 있으며, 유저가 직접 지정할 수도 있습니다.
- 따라서 필수값 입력 여부로 유효성을 검사한 뒤 액션을 디스패치합니다.

#### 1-2) 연락처 조회
```
const filteredList = useSelector(state => state.filteredList);
```
- 스토어가 가지고 있는 상태: `contactList`, `filteredList`, `keyword`
- 이중 `filteredList`를 컴포넌트에 렌더링하기 위해 `useSelector`로 가져옵니다.
- 이를 `map` 함수를 이용하여 자식 컴포넌트로 렌더링되도록 합니다.

#### 1-3) 연락처 삭제
```
dispatch({type:"DELETE_CONTACT", payload:{id:item.id}});
```
- 특정 연락처를 삭제하기 위해 `id`를 리듀서로 보내야 합니다.
- 리듀서에서는 `contactList`와 `filteredList`에 동일한 작업이 이루어집니다.
- 해당 `id`가 있는 연락처를 제외한 배열을 가지는 것입니다.

#### 1-4) 검색
```
dispatch({type:"SEARCH_BY_NAME", payload:{keyword}});
```
- 연락처를 이름으로 검색할 수 있습니다.
- `keyword`를 리듀서로 보내고 이 `keyword`가 들어가는 연락처를 필터링합니다.
- 리듀서에서는 이 `filteredList`, `keyword`를 스토어에 저장합니다.

### 2) 안내 메세지로 사용자 경험 개선
#### 2-1) 연락처 추가: 유효성 검사
```
{showNameMsg && (<div className="msg-desc">이름: 필수 정보입니다.</div>)}
{showPhoneMsg && (<div className="msg-desc">휴대전화번호: 필수 정보입니다.</div>)}
```
- 연락처 정보 중에는 이름과 전화번호가 필수값입니다.
- 이 필수값이 비어있는 경우 어떤 값이 입력되지 않았는지 유저에게 알려야 합니다.

#### 2-2) 검색: 키워드와 결과에 따른 안내
```
{noKeyword && (<div className="search-msg">키워드가 입력되지 않았습니다.</div>)}
{noMatched && (<div className="search-msg">검색 결과가 없습니다.</div>)}
```
- 키워드가 없는 경우 경고문구를 표시하여 유저에게 필요한 동작을 정확히 전달합니다.
- 키워드는 있지만 키워드와 일치하는 연락처가 없는 경우 경고문구를 표시하여 현재 상황을 구체적으로 알립니다.

#### 2-3) 요약
- 이와 같은 안내 문구를 통해 사용자가 입력 과정에서 발생할 수 있는 혼란을 줄입니다.
- 일련의 과정에서 명확한 피드백을 제공하여 더 나은 사용자 경험을 제공합니다.
