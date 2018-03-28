#!/usr/bin/python3
import sys,os,shutil,re,time
_corePath=os.path.abspath('')+'/../'
_path=os.path.abspath('')+'/../../'
projectPath=""

def _joinFile(file,ls):
    global projectPath
    strs=[]
    if not os.path.isfile(file):
        return ""
    fileTemp=open(file,mode='r',encoding='utf-8')
   
    
    for i in fileTemp.readlines():
        if i.find('$Import(')!=-1:

            i=i.split('(')[1].split(')')[0].replace('"','').replace("'",'').replace('.','/')+'.js'

            if i.find('core/')==0:
                i=_corePath+i
            else:
                i=projectPath+i
            if ls.count(i)==0:
                ls.append(i)
                strs.append(_joinFile(i,ls))
        else:
            strs.append(i)

    fileTemp.close()

    return ''.join(strs)+'\n'
def joinFile(conf):

    if not conf:
        print('error:no path or ')
        return

    print('\n========= making the  **-srclist-temp.js,please waite... =========\n')
    for root,dirs,files in os.walk(conf):
        for fn in files:
            Global_ls=[]
            fn=root+'/'+fn
            if fn.find('.svn')==-1 and fn.find('.js')!=-1 and fn.find('-srclist.js')==-1 and fn.find('-srclist-temp.js')==-1:
              
                fl=_joinFile(fn,Global_ls)
                tt=fn.split('.js')

                _tempFile=open(tt[0]+'-srclist-temp.js',mode='w',encoding='utf-8')
                _tempFile.writelines(fl)
                del fl

                print(_tempFile.name)
                _tempFile.close()

    print('\n========= clearing the old **-srclist.js,please waite... =========\n')
    tm=time.time()
    for root,dirs,files in os.walk(conf):
        for fn in files:
            fn=root+'/'+fn
            if fn.find('-srclist.js')!=-1 and fn.find('.svn')==-1:
                os.remove(fn)

    for root,dirs,files in os.walk(conf):
        for fn in files:
            fn=root+'/'+fn
            if fn.find('-srclist-temp.js')!=-1 and fn.find('.svn')==-1:
                os.rename(fn,re.sub(r"-temp.js$",".js",fn))
    print("time:"+str(time.time()-tm))
    print('all clear~')
    
    print('\n========= done all success ~^@^~ =========\n')



projectPath=_path+'/js/'
if __name__=="__main__":

    joinFile(projectPath+'conf')
else:
    joinFile(projectPath+'conf')
