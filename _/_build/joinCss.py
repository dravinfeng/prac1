#!/usr/bin/python3
import sys,os,shutil,re
_path=os.path.abspath('')+'/../../'

def _joinFile(file,ls):
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
    
    for i in fileTemp.readlines():
        #i = i.strip()
        i=i.replace('\ufeff','')
        if i.find('@import')!=-1:
            i=re.sub(r"['|\"]","\"",i)
            i=i.split('"')[1]
            i=pt+i
            if ls.count(i)==0:
                ls.append(i)
                strs.append(_joinFile(i,ls))
        else:
            strs.append(i)

    fileTemp.close()
    c=''.join(strs)+'\n'
    if(rs==1):
        c=re.sub(r"\s+"," ",c)
        c=re.sub(r"\/\*.*?\*\/","",c)
    return c
def joinFile(conf):

    if not conf:
        print('error:no path or ')
        return
    print('\n========= clearing the old **-srclist.css,please waite... =========\n')

    for root,dirs,files in os.walk(conf):
        for fn in files:
            fn=root+'/'+fn
            if fn.find('-srclist.css')!=-1 and fn.find('.svn')==-1:
                os.remove(fn)
    print('all clear~')
    print('\n========= making the  **-srclist.css,please waite... =========\n')
    for root,dirs,files in os.walk(conf):
        for fn in files:
            fn=root+'/'+fn
            if fn.find('.svn')==-1 and fn.find('.css')!=-1:
              
                fl=_joinFile(fn,[])
                tt=fn.split('.css')

                _tempFile=open(tt[0]+'-srclist.css',mode='w',encoding='utf-8')
                _tempFile.writelines(fl)
                del fl

                print(_tempFile.name)
                _tempFile.close()

    print('\n========= done all success ~^@^~ =========\n')

_path=_path+'/ui/css/pages/'
print("do you need compiling? yes or no (y|n)")
rs=input()
if(rs=='y' or rs=='yes'):
    rs=1
else:
    rs=0
    
if __name__=="__main__":

    joinFile(_path)
else:
    joinFile(_path)

print('Press "Enter" to continue...')
input()
