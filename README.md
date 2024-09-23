![Header](https://capsule-render.vercel.app/api?type=rect&color=06402b&text=Contacts&desc=연락처%20정보를%20관리하는%20전화번호부%20앱%20미니%20프로젝트&section=header&height=250&fontColor=ffffff&fontSize=60&fontAlignY=45&descAlignY=67&descSize=30)
<br><br>

## 📍프로젝트 소개
현재 위치를 바탕으로 날씨를 알려주는 리액트 기반의 날씨 앱 미니 프로젝트입니다. API를 통해 현재 위치 또는 미리 설정된 주요 도시의 다양한 날씨 정보를 실시간으로 받아옵니다. 또한 렌더링할 상태 데이터들을 리덕스로 관리합니다. 리덕스를 통해 전역 상태로 관리하여 컴포넌트 간 데이터를 효율적으로 공유하고 상태 변화에 따라 UI를 일관되게 업데이트합니다.

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
- 리덕스 기반 상태 관리: 상태 관리의 일관성을 유지하고 데이터를 효율적으로 공유합니다.
- 연락처 추가: 사용자가 새로운 연락처를 등록할 수 있으며, 입력된 정보는 실시간으로 저장됩니다.
- 연락처 검색/조회: 사용자가 이름으로 연락처를 쉽게 검색하고 결과를 바로 확인할 수 있습니다.
- 연락처 삭제: 저장된 연락처를 삭제할 수 있어 데이터를 유연하게 관리할 수 있습니다.
- 컴포넌트화: 화면을 효율적으로 구성하기 위해 연락처 리스트와 정보 영역을 컴포넌트로 분리하였습니다.

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

### 2) 사용자 경험 개선
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

## 📍리덕스(Redux)
![Redux1](https://github.com/user-attachments/assets/a1575b95-084f-4431-a12e-7c0a7bf7c147)
- 리덕스를 사용하기 전은 부모 컴포넌트가 자식 컴포넌트에게 상태를 전달하는 단방향 소통만 가능했습니다.
- 하지만 리덕스를 사용하면 `store`에서 상태를 중앙집중적으로 관리하기 때문에 양방향 소통이 가능해집니다.
- 즉 리덕스를 사용하면 자식이 부모에게, 혹은 자식 컴포넌트 간에도 상태를 공유할 수 있습니다.
- 각각의 컴포넌트들이 상태를 요청하면(액션을 디스패치) 리덕스가 전달해줍니다.
- 단, 컴포넌트에서 상태를 직접적으로 요청할 수는 없습니다.
![Redux2](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdKSDm4%2FbtsI06pfbTM%2FlwpYgCs0ahOavdCQkMVDy0%2Fimg.png)
- `dispatch`로 `action`을 `reducer`에 보내고 함수가 호출된 이후 `store`에 상태가 저장되면 그 상태를 컴포넌트에 `useSelector`를 통해 가져오는 과정을 거쳐야 합니다.
- 리덕스는 상태 관리의 일관성을 유지하고, 복잡한 컴포넌트 간의 데이터를 효율적으로 공유할 수 있도록 도와줍니다.
