<template> 
    <div> 
        <div> 
            <el-button icon="el-icon-plus" @click="showAddQuestion">添加</el-button> 
        </div>
        <div class="hr-container">
            <el-card class="hr-card" size="small" type="primary" v-for="(question,index) in questions" :key="index">
                <div slot="header" class="clearfix">
                    <el-button style="float: right; padding: 3px 0;color:#e30007;" type="text" icon="el-icon-delete" @click="deleteQuestion(question)" ></el-button>
                    <div class="container_question">
                        <div> 问题: {{question.question}} 
                        </div> 
                    </div>
                </div>
                
                <div class="container_content1">
                    <div> 心得 </div> 
                </div>
                
                <div class="container_content2"> 
                    <div> ------{{question.content}} </div> 
                </div>
            </el-card> 
        </div> 
        <el-dialog title="增加问题和心得" :visible.sync="dialogVisible_add" width="70%">
            <div>
                <div> 
                    <el-tag>问题</el-tag> 
                    <el-input type="textarea" :rows="3" placeholder="请输入问题" v-model="AddQuestion.question"></el-input> 
                </div>
                <div>
                    <el-tag>心得</el-tag>
                    <el-input type="textarea" :rows="7" placeholder="请输入心得" v-model="AddQuestion.content"></el-input>\
                </div>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible_add = false">取 消</el-button>
                <el-button size="small" @click="addQuestion" type="primary">确 定</el-button> 
            </span>
        </el-dialog>
    </div> 
</template>

<script>

    export default { 
        name: "QuestionsManage", 
        data() { 
            return { 
                questions: [], 
                dialogVisible_add: false, 
                AddQuestion: { 
                    question: '', 
                    content: '' 
                },
            }
        }, 
        mounted() {
            this.initQuestions(); 
        }, 
        methods: {
            deleteQuestion(question) {
                this.$confirm('此操作将永久删除该问题 , 是否继续?', '提示', {
                    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' 
                }).then(() => {
                    this.deleteRequest("/learn/question/"+question.id).then(resp=>{ 
                        if (resp) { 
                            this.initQuestions(); 
                        } 
                    }) 
                }).catch(() => { 
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            }, 
            showAddQuestion() { 
                this.AddQuestion.question=''; 
                this.AddQuestion.content=''; 
                this.dialogVisible_add=true; 
            }, 
            addQuestion() { 
                this.postRequest("/learn/question/", this.AddQuestion).then(resp => { 
                    if (resp) { 
                        this.initQuestions(); 
                        this.dialogVisible_add=false; 
                    }
                })
            }, 
            initQuestions() {
                this.getRequest("/learn/question/").then(resp => { 
                    if (resp) { 
                        this.questions = resp; 
                    } 
                }) 
            }
        }
    } 
</script>

<style scoped>
    .container_question div { 
        font-size: 15px; 
        color: #ff1456; 
        font-weight:bold; 
        text-align:center; 
    } 
    .container_answer div { 
        font-size: 15px; 
        color: #ff1456; 
        font-weight:normal; 
    } 
    .container_content1 div { 
        font-size: 15px; 
        color: #409eff; 
        font-weight:bold; 
        text-align:center; 
    } 
    .container_content2 div { 
        font-size: 13px; 
        color: #409eff; 
        font-weight:normal; 
    } 
    .addQuestionInput { 
        width: 200px; 
        margin-left: 8px; 
    } 
    .addcontentInput { 
        width: 600px; 
        height: 80%;
        margin-left: 8px;
    }
</style>