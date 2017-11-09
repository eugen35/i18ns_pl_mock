export function genKeyFromTplStr(strings){
  return strings.reduce((previousValue, currentItem) => previousValue + '${.}' + currentItem);
}


export function tTplStr(strings, ...values){
  const translation = {
    'Entry with id=${.} is not found': 'Запись с id=${.} не найдена',
    'I love ${.}': 'Люблю ${.}',
    '${.} is cool': '${.} - это круто',
    '${.} translated ${.}': '${.} переведено ${.}',
    'One ${.} two ${.} three': 'Один ${.} два ${.} три',
    '${.}': '${.}',
    'Repa': 'Репа',
  };
  const key = genKeyFromTplStr(strings);
  console.log(values);

  if (translation[key]) {
    const translationArr = translation[key].split('${.}');
    let result='';
    translationArr.forEach((el,index)=>{
      if (el) result+=el;
      if (values[index]) result+=values[index];
    });
    return result;
  }
}


