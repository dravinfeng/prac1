#!/usr/bin/python3
import sys,os,shutil,re,codecs
_path=os.path.abspath('')+'/../../'

def _joinFile(file,isAll):
    global rs
    strs=[]
    c=""
    if not os.path.isfile(file):
        return ""
    sta=re.search(".*/",file)
    if sta:
        pt=sta.group()
    else:
        return ""
    fileTemp=open(file,mode='r',encoding='utf-8')
    state=0

    for i in fileTemp.readlines():
        #i = i.strip()
        i=i.replace('\ufeff','')
        if isAll and i.find('<import src=')==-1:
            strs.append(i)

        if i.find('<import src=')!=-1:
            i=i.strip()
            i=re.sub(r"<import src=['|\"]","",i)
            i=re.findall(r"^.*\.html",i)
            if len(i)>0:
                i=i[0]
            else:
                i=""
            i=pt+i
            strs.append(_joinFile(i,False))
        else:
            
            if re.search(r'<import\s*>',i)!=None and state==0:
                state=1
            elif re.search(r'</\s*import\s*>',i)!=None and state==1:
                break
            elif re.search(r'<import\s*>',i)==None and re.search(r'</import>',i)==None and state==1:
                strs.append(i)


    fileTemp.close()
    c=''.join(strs)+'\n'
    return c
def joinFile(conf):

    if not conf:
        print('error:no path or ')
        return
    print('\n========= clearing the old **-srclist.css,please waite... =========\n')

    for root,dirs,files in os.walk(conf):
        for fn in files:
            fn=root+'/'+fn
            if fn.find('-srclist.html')!=-1 and fn.find('.svn')==-1:
                os.remove(fn)
    print('all clear~')
    print('\n========= making the  **-srclist.css,please waite... =========\n')
    for root,dirs,files in os.walk(conf):
        for fn in files:
            fn=root+'/'+fn
            print(fn)
            if fn.find('.svn')==-1 and fn.find('.html')!=-1:
              
                fl=_joinFile(fn,True)
                tt=fn.split('.html')

                _tempFile=open(tt[0]+'-srclist.html',mode='w',encoding='utf-8')
                _tempFile.writelines(fl)
                del fl

                print(_tempFile.name)
                _tempFile.close()

    print('\n========= done all success ~^@^~ =========\n')

_path=_path+'/ui/html/pages/'
    
if __name__=="__main__":

    joinFile(_path)
else:
    joinFile(_path)
